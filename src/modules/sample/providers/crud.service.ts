import { Injectable } from '@nestjs/common';

@Injectable()
export class CrudService {
  public create(data: any): Promise<any> {
    return data;
  }

  public async read(id: number): Promise<any | null> {
    return id;
  }

  public async update(id: number, data: any): Promise<any> {
    return [id, data];
  }

  public async remove(id: number): Promise<any> {
    return id;
  }
}
