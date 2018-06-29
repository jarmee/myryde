import { MyrydeMaterialModule } from './myryde-material.module';

describe('MyrydeMaterialModule', () => {
  let myrydeMaterialModule: MyrydeMaterialModule;

  beforeEach(() => {
    myrydeMaterialModule = new MyrydeMaterialModule();
  });

  it('should create an instance', () => {
    expect(myrydeMaterialModule).toBeTruthy();
  });
});
