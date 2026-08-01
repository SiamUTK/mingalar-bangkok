import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Supabase Connection Test</h1>

      <pre className="rounded-lg border p-4 overflow-auto">
        {JSON.stringify(
          {
            connected: !error,
            error: error?.message ?? null,
            user,
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}
