import assert from "node:assert/strict";
import test from "node:test";

import {
  careerProjects,
  projectsByGroup,
  featuredProjects,
  getProject,
} from "../src/data/projects.ts";

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

test("featured work preserves approved scope and distinguishes project dates from employment", () => {
  assert.deepEqual(
    featuredProjects.map(({ slug }) => slug),
    ["bok-cbdc-usability-test", "amorepacific-aws-migration", "skt-tdeal-terraform-infrastructure"],
  );
  assert.ok(featuredProjects.every(({ status }) => status === "Completed"));
  const cbdc = getProject("bok-cbdc-usability-test");
  assert.equal(cbdc.period, "2024.08–2025.07");
  assert.match(cbdc.affiliation.ko, /2024.09–2025.07/);
  assert.match(cbdc.affiliation.en, /2024.09–2025.07/);
  const current = getProject("bok-cbdc-ncp-infrastructure");
  assert.equal(current.status, "In Progress");
  assert.equal(current.periodLabel.en, "Planned project scope");
  assert.match(current.affiliation.en, /2026.04–present/);
  assert.equal(getProject("amorepacific-aws-migration").period, "2023.01.04–2023.10.31");
  assert.equal(getProject("amorepacific-aws-operations").period, "2023.11.01–2025.04");
  for (const project of careerProjects.filter(({ period }) => period === "2018.12–2021.09")) {
    assert.equal(project.periodLabel.en, "Employment period");
    assert.match(project.affiliation.ko, /아이와이씨앤씨/);
  }
  for (const slug of ["self-service-ai-platform", "llm-inference-platform"]) {
    assert.equal(getProject(slug).status, "Planned");
  }
});
