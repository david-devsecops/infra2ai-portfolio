import assert from "node:assert/strict";
import test from "node:test";

import { careerProjects, projectsByGroup } from "../src/data/projects.ts";

test("publishes the complete resume-backed project catalog", () => {
  assert.equal(careerProjects.length, 32);
  assert.equal(new Set(careerProjects.map(({ slug }) => slug)).size, 32);
  assert.equal(projectsByGroup("cloud-security").length, 13);
  assert.equal(projectsByGroup("oracle-data").length, 15);
  assert.equal(projectsByGroup("unix-storage").length, 4);
});

test("requires metadata and minimum content by evidence level", () => {
  for (const project of careerProjects) {
    assert.ok(project.client);
    assert.ok(project.period);
    assert.ok(project.role?.ko && project.role?.en);
    assert.ok(project.technologies.length > 0);
    assert.ok(project.sections.overview);
    assert.ok(project.localized?.ko?.sections.overview);

    const keys = Object.keys(project.sections);
    if (project.detailLevel === "deep") {
      assert.ok(keys.length >= 6, `${project.slug} needs deep sections`);
    } else {
      assert.ok(keys.length >= 3, `${project.slug} needs compact sections`);
    }
  }
});
