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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await actions.login({
        identifier: inputForm.user.trim(),
        password: inputForm.password,
      });

      if (error) {
        setErrorMessage(error.message || "No se pudo iniciar sesión. Revisá tus datos e intentá de nuevo.");
        return;
      }

      window.location.assign("/admin/home");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesión. Revisá tu conexión e intentá de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-[min(500px,calc(100vw-2rem))] flex-col gap-y-2" onSubmit={handleSubmit}>
      <label htmlFor="login-identifier" className="text-sm font-medium text-gray-700">
        Usuario o correo electrónico
      </label>
      <input
        id="login-identifier"
        name="identifier"
        type="text"
        autoComplete="username"
        required
        disabled={loading}
        placeholder="Usuario"
        className="mb-4 w-full rounded-md border border-gray-300 p-2 disabled:bg-gray-100"
        value={inputForm.user}
        onChange={(e) => {
          setInputForm({ ...inputForm, user: e.target.value });
        }}
      />
      <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
        Contraseña
      </label>
      <input
        id="login-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        disabled={loading}
        placeholder="Contraseña"
        className="mb-4 w-full rounded-md border border-gray-300 p-2 disabled:bg-gray-100"
        value={inputForm.password}
        onChange={(e) => {
          setInputForm({ ...inputForm, password: e.target.value });
        }}
      />
      {errorMessage && (
        <p className="mb-2 rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
