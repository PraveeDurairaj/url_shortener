import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;

    try {
      const stored = localStorage.getItem("shortenedUrls");
      if (stored) {
        const urls = JSON.parse(stored);
        const found = urls.find((item) => item.id === code);

        if (found) {
          window.location.href = found.original;
          return;
        }
      }

      // If not found, go home
      router.push("/");
    } catch (err) {
      console.error("Redirect error:", err);
      router.push("/");
    }
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
      <p className="text-gray-500">Please wait a moment.</p>
    </div>
  );
}
