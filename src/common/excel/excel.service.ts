import { Injectable } from "@nestjs/common";
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
    read(file: Express.Multer.File): any[] {
        const workbook = XLSX.read(file.buffer, {
          type: 'buffer',
        });
      
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
      
        const rows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        return rows.map((row) =>
            Object.fromEntries(
                Object.entries(row).map(([key, value]) => [
                    key.toLowerCase().trim(),
                    value,
                ]),
            ),
        );
      }
}