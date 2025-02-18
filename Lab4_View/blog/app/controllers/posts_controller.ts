import type { HttpContext } from '@adonisjs/core/http'
interface Post {
  id: number
  title: string
  body: string
}
const posts: Post[] = [
  {
    id: 1,
    title: 'Hello AdonisJS',
    body: 'Adonis includes everything you need to create fully functional web app or an API server.',
  },
  {
    id: 2,
    title: 'VueJS',
    body: 'Vue is a progressive framework for building user interfaces.',
  },
]
export default class PostsController {
  async index({ view }: HttpContext) {
    //return posts
    return view.render('posts', { posts: posts })
  }
  async show({ params, view }: HttpContext) {
    const id = params.id
    const post = posts.find((p) => p.id === Number(id))

    if (post) {
      return view.render('detail', { post }) // render view 'detail.edge'x
    } else {
      return view.render('not_found', { message: 'Post not found' })
    }
  }
  async create({ view }: HttpContext) {
    return view.render('create')
  }
  async store({ request, response }: HttpContext) {
    const title = request.input('title')
    const body = request.input('body')

    const newId = posts.length + 1
    const newPost: Post = { id: newId, title: title, body: body }
    posts.push(newPost)

    response.redirect().toPath('/posts')
  }
  async update({ params, request, response }: HttpContext) {
    const id = params.id
    const index = posts.findIndex((p) => p.id == Number(id))
    posts[index].title = request.input('title')
    posts[index].body = request.input('body')
    response.redirect().toPath('/posts')
  }
  async edit({ params, view }: HttpContext) {
    const id = params.id
    const post = posts.find((p) => p.id == Number(id))
    return view.render('edit', { post: post })
  }
  async destroy({ params, response }: HttpContext) {
    const id = params.id
    const index = posts.findIndex((p) => p.id == Number(id))
    posts.splice(index, 1)
    response.redirect().toPath('/posts')
  }
}
