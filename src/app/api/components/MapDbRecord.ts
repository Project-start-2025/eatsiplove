// src/lib/mapDbRecord.ts

// Chuyển PascalCase → camelCase (VD: "RequestDate" → "requestDate")
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Chuyển 1 record SQL Server thành object với key camelCase
export function mapDbRecord(record: any): Record<string, any> {
  const mapped: Record<string, any> = {};
  for (const key in record) {
    mapped[toCamelCase(key)] = record[key];
  }
  return mapped;
}

// Ánh xạ toàn bộ mảng recordset
export function MapDbRecordSet(recordset: any[]): Record<string, any>[] {
  return recordset.map(mapDbRecord);
}
