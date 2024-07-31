import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id, first_name, email_addresses, has_image, last_name } =
    evt.data as {
      id: string;
      first_name: string;
      email_addresses: { email_address: string }[];
      has_image: boolean;
      last_name: string;
    };
  const fullName = `${first_name} ${last_name}`;
  const email = email_addresses[0].email_address;
  console.log("evt", evt);
  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { error } = await supabase
      .from("users")
      .upsert([{ id, fullName: fullName, email, has_image }]);

    if (error) {
      console.error("Error upserting into Supabase:", error);
      return new Response("Error upserting into database", {
        status: 500,
      });
    }
  }

  return new Response("", { status: 200 });
}
