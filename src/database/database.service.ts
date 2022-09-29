import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';
import { nameFields } from './helpers';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(private config: ConfigService) {
    const confDb = config.getOrThrow('database');
    this.pool = new Pool({ ...confDb });
  }

  // Base
  query(text: string, params?: any[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }

  queryOneRow<T>(text: string, params?: any[]): Promise<T> {
    return this.pool.query(text, params).then((result) => {
      return result.rows[0];
    });
  }

  queryManyRows(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params).then((result) => {
      return result.rows;
    });
  }

  queryOneRowField<T>(text: string, field: string, params?: any[]): Promise<T> {
    return this.pool.query(text, params).then((result) => {
      return result.rows[0][field];
    });
  }

  // CRUD operations
  async create<T>(table: string, entity: T, namesFields: nameFields<T>) {
    const entityMap: any = {};
    for (const key in entity) {
      entityMap[namesFields[key]] = entity[key];
    }

    const valueP = [];
    for (const _ in entity) {
      valueP.push(`$${valueP.length + 1}`);
    }

    await this.query(
      `INSERT INTO ${table} (${Object.keys(entityMap)}) VALUES (${valueP})`,
      [...Object.values(entityMap)],
    );
  }

  async read<T>(table: string, entity: T, namesFields: nameFields<T>) {
    const entityMap: any = {};
    for (const key in entity) {
      entityMap[namesFields[key]] = entity[key];
    }

    const whereP = [];
    for (const key in entityMap) {
      whereP.push(`${key}=$${whereP.length + 1}`);
    }

    await this.queryManyRows(`SELECT * FROM ${table} WHERE ${whereP}`, [
      ...Object.values(entityMap),
    ]);
  }

  async update<T>(
    table: string,
    where: T,
    entity: T,
    namesFields: nameFields<T>,
  ) {
    const whereMap: any = {};
    for (const key in where) {
      whereMap[namesFields[key]] = where[key];
    }

    const entityMap: any = {};
    for (const key in entity) {
      entityMap[namesFields[key]] = entity[key];
    }

    let i: number = 1;

    const setP = [];
    for (const key in entityMap) {
      setP.push(`${key}=$${i++}`);
    }

    const whereP = [];
    for (const key in whereMap) {
      whereP.push(`${key}=$${i++}`);
    }

    await this.query(
      `UPDATE ${table} 
            SET ${setP}
            WHERE ${whereP}`,
      [...Object.values(entityMap), ...Object.values(whereMap)],
    );
  }

  async delete<T>(table: string, entity: T, namesFields: nameFields<T>) {
    const entityMap: any = {};
    for (const key in entity) {
      entityMap[namesFields[key]] = entity[key];
    }

    const whereP = [];
    for (const key in entityMap) {
      whereP.push(`${key}=$${whereP.length + 1}`);
    }

    await this.query(`DELETE FROM ${table} WHERE ${whereP}`, [
      ...Object.values(entityMap),
    ]);
  }
}
