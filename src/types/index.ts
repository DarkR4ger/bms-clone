// login and registe page
interface FormElements extends HTMLFormControlsCollection {
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface UserFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

//user data in route
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

// dashboard
export interface UserData {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
