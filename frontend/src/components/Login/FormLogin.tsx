import { actions } from "astro:actions";
import { useState } from "react";

export default function FormLogin() {
  const [inputForm, setInputForm] = useState<{
    user: string;
    password: string;
  }>({
    user: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    /*  try {
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
    } */

    try {
      const { data, error } = await actions.login({
        identifier: inputForm.user,
        password: inputForm.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      //console.log("Login correcto:", data);

      //window.location.href = "/admin/home";
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
      window.location.href = "/admin/home";
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

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
