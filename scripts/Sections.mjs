export function setSectionSelection(course) {
  const sectionSelect = document.querySelector("#sectionNumber");
  course.sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}
