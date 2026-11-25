import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

describe('Todo application', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('does not add an empty task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('adds a task and persists it to local storage', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add to task list'), 'Learn Vitest')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByText('Learn Vitest')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('todoList'))).toEqual([
      expect.objectContaining({ text: 'Learn Vitest', completed: false }),
    ])
  })

  it('toggles a task as completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add to task list'), 'Complete task')
    await user.click(screen.getByRole('button', { name: 'Add task' }))
    await user.click(screen.getByRole('checkbox'))

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add to task list'), 'Remove task')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    const trashIcon = screen.getByText('Remove task').parentElement.querySelector('svg:last-child')
    await user.click(trashIcon)

    expect(screen.queryByText('Remove task')).not.toBeInTheDocument()
  })

  it('prevents duplicate tasks', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    const input = screen.getByPlaceholderText('Add to task list')
    await user.type(input, 'Repeated task')
    await user.click(screen.getByRole('button', { name: 'Add task' }))
    await user.type(input, 'Repeated task')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(window.alert).toHaveBeenCalledWith('Todo items already exist')
    expect(screen.getAllByText('Repeated task')).toHaveLength(1)
  })
})
