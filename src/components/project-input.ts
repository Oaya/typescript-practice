import { Component } from "./base.js";
import {
  Validatable,
  validate,
} from "../util/validation.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

//ProjectInput Class//
export class ProjectInput extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super(
      "project-input",
      "app",
      true,
      "user-input"
    );

    this.titleInputElement =
      this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
    this.descriptionInputElement =
      this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
    this.peopleInputElement =
      this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

    this.configure();
  }

  renderContent() {}
  configure() {
    this.element.addEventListener(
      "submit",
      this.submitHandler.bind(this)
    );
  }

  private gatherUserInput():
    | [string, string, number]
    | void {
    const enteredTitle =
      this.titleInputElement.value;
    const enteredDescription =
      this.descriptionInputElement.value;
    const enteredPeople =
      this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input value");
      return;
    } else {
      return [
        enteredTitle,
        enteredDescription,
        +enteredPeople,
      ];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(
        title,
        desc,
        people
      );
      console.log(title, desc, people);
      this.clearInput();
    }
  }
}
