import { CrudService } from './crud.service';
import { Test } from '@nestjs/testing';

describe('sample crud', () => {
  let crudService: CrudService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CrudService],
    }).compile();
    crudService = moduleRef.get(CrudService);
  });

  describe('create', () => {
    it('OK', () => {
      const exp: any = crudService.create(123);
      expect(exp).toBe(123);
    });

    it('exception', () => {
      expect(() => crudService.create('error')).toThrowError(new Error('123'));
    });
  });

  it('example async exception', () => {
    expect(async () => await crudService.read(1)).rejects.toThrowError(
      new Error('123'),
    );
  });
});
