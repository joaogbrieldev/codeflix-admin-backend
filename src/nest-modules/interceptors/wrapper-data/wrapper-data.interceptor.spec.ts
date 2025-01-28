import { lastValueFrom, of } from 'rxjs';
import { WrapperDataInterceptor } from './wrapper-data.interceptor';

describe('WrapperDataInterceptor', () => {

  let interceptor: WrapperDataInterceptor;

  beforeEach(() => {
    interceptor = new WrapperDataInterceptor()
  })

  it('should wrapper with data key', async() => {
    expect(new WrapperDataInterceptor()).toBeDefined();
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({name: 'test'})
    })
    const result = await lastValueFrom(obs$);
    expect(result).toEqual({data: {name: 'test'}})
  });
});
