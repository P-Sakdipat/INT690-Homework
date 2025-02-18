/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|


import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home') */
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import PostsController from '#controllers/posts_controller'

router.get('/', ({ response }: HttpContext) => {
  response.redirect().toPath('/posts')
})

router.get('/posts', [PostsController, 'index']).as('posts.home')
router.post('/posts', [PostsController, 'store']).as('posts.store')
router.get('posts/create', [PostsController, 'create']).as('posts.create')
router.get('/posts/:id', [PostsController, 'show']).as('posts.show')
router.get('/posts/:id/edit', [PostsController, 'edit']).as('posts.edit')
router.get('/posts/:id/delete', [PostsController, 'destroy']).as('posts.delete')
router.post('/posts/:id/update', [PostsController, 'update']).as('posts.update')
