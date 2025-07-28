import { Hono } from 'hono'
import { readmeContent } from './首页'
import { zlibraryRedirectContent } from './zlibraryRedirectPage'
/*
type Bindings = {

  kv:KVNamespace
}
  */
export const app = new Hono()

const domains = {
  staticList: [
    'https://z-lib.gd',
    'https://1lib.sk',
    'https://z-lib.fm',
    'https://z-lib.gl',
    'https://z-lib.fo',
    'https://z-library.sk'
  ]
}







app.get('/', async (c) => {

  
  return c.html(readmeContent);
});

app.get('/zlibrary-js', async (c) => {
  return c.html(zlibraryRedirectContent);
})



export default app
