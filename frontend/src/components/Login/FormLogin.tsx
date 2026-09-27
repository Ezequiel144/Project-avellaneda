import { useState } from "react";
import { strapiFetch } from "../../utils/fetch";

export default function FormLogin() {
  const [inputForm, setInputForm] = useState<{
    user: string;
    password: string;
  }>({
    user: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await strapiFetch("/auth/local", {
        method: "POST",
        body: JSON.stringify({
          identifier: inputForm.user,
          password: inputForm.password,
        }),
      });

      console.log("Login correcto:", response);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <form className="flex flex-col gap-y-2 w-[500px]" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        value={inputForm.user}
        onChange={(e) => {
          setInputForm({ ...inputForm, user: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        value={inputForm.password}
        onChange={(e) => {
          setInputForm({ ...inputForm, password: e.target.value });
        }}
      />
      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Ingresar
      </button>
    </form>
  );
}
