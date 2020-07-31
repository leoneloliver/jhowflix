import React, { useState, useEffect } from 'react'

import Form from './styles'

import PageDefault from '../../components/pageDefault'
import FormField from '../../components/formField'
import Button from '../../components/button'
import Category from '../../components/category'
import Loading from '../../components/loading'

const initialCategory = {
  name: '',
  description: '',
  color: '#999999'
}

const NewCategory = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(initialCategory)

  const changeCategory = (e) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    })
  }

  const saveNewCategory = (e) => {
    e.preventDefault()
    setCategories([...categories, category])
    setCategory(initialCategory)
  }

  const getCategories = async () => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categories'
      : 'https://jhowflix.herokuapp.com/categories'
    const res = await window.fetch(URL)
    const categories = await res.json()
    setCategories(categories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <PageDefault>
      <h1 style={{ margin: '0.25rem' }}>Register new category: </h1>

      <Category
        title={category.title || 'Initial Name'}
        color={category.color}
        style={{ marginTop: 0 }}
      />

      <Form onSubmit={saveNewCategory}>
        <FormField
          required
          name='name'
          value={category.name}
          onChange={changeCategory}
        />

        <FormField
          name='description'
          value={category.description}
          onChange={changeCategory}
          textarea
        />

        <FormField
          name='color'
          type='color'
          value={category.color}
          onChange={changeCategory}
        />

        <Button style={{ padding: '0.5rem', backgroundColor: 'var(--black)' }} notMoveable>
          Register
        </Button>
      </Form>

      {categories.length === 0 &&
        <Loading />}

      {categories.map((cat, count) => (
        <React.Fragment key={count}>
          <Category title={cat.title} color={cat.color} />
          <br />
        </React.Fragment>
      ))}
    </PageDefault>
  )
}

export default NewCategory
