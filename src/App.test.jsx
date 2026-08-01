import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
vi.mock('framer-motion',()=>({AnimatePresence:({children})=>children,motion:{div:({children,...props})=><div {...props}>{children}</div>}}))
describe('flashcard app',()=>{beforeEach(()=>localStorage.clear());it('flips to reveal the answer',()=>{render(<App/>);const card=screen.getByRole('button',{name:'พลิกดูคำตอบ'});fireEvent.click(card);expect(screen.getByText('ame')).toBeInTheDocument();expect(card).toHaveClass('is-flipped')});it('filters by group',()=>{render(<App/>);fireEvent.click(screen.getByRole('button',{name:/แถว Y/}));expect(screen.getByText('เรือยอชต์กางใบ')).toBeInTheDocument()})})
