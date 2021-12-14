import { Docker } from '../main';

describe('Docker', async () => {
  it('should get list of all containers', async () => {
    //
    console.log(await Docker.image.list());
  });
});
