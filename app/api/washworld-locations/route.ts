import { NextResponse } from "next/server";

type WashWorldApiLocation = {
  uid?: string;
  Location_id?: string;
  name?: string;
  address?: string;
  coordinates?: {
    x?: string | number;
    y?: string | number;
  };
};

type Location = {
  id: string;
  name: string;
  address: string;
  position: [number, number];
};

function toNumber(value: string | number | undefined) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeLocation(location: WashWorldApiLocation): Location | null {
  const latitude = toNumber(location.coordinates?.y);
  const longitude = toNumber(location.coordinates?.x);

  if (!location.name || !location.address || latitude === null || longitude === null) {
    return null;
  }

  return {
    id: location.uid || location.Location_id || location.name,
    name: location.name,
    address: location.address,
    position: [latitude, longitude],
  };
}

export async function GET() {
  try {
    const response = await fetch("https://headless.washworld.dk/wp-json/ww/v1/locations", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch locations" }, { status: 502 });
    }

    const data: WashWorldApiLocation[] = await response.json();
    const locations = data
      .map(normalizeLocation)
      .filter((location): location is Location => location !== null);

    return NextResponse.json(locations);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: "Unable to load locations" }, { status: 500 });
  }
}