"use client";

type UserData = {
  id: string;
  name: string;
  email: string;
};

const HomePage = ({ id, name, email }: UserData) => {
  return (
    <section className="container px-6">
      <div>
        Hello {name}, email: {email}
      </div>
    </section>
  );
};

export default HomePage;
