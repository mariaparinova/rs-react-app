import { NextRequest, NextResponse } from 'next/server';
import { getPetById } from '../../../../api-repositories/pets/pets.ts';

export async function GET(request: NextRequest) {
  const petIdsStr = request.nextUrl.searchParams.get('ids');
  const baseUrl = request.nextUrl.origin;
  let rows: string[] = [];

  if (petIdsStr) {
    const petIds = petIdsStr.split(',');
    const pets = await Promise.all(petIds.map((id) => getPetById({ id })));
    rows = pets.map((pet) => `${pet.id},${pet.name},${baseUrl}/pets/${pet.id}`);
  }

  const filename = `${rows.length}_items.csv`;
  const headers = ['id', 'name', 'url'];
  const csvContent = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
