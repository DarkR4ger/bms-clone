interface FormElements extends HTMLFormControlsCollection {
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface UserFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

//user data in route
export interface UserData {
  name?: string;
  email: string;
  password: string;
}
