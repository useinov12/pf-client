import React from 'react'
import clsx from 'clsx'
import { ThemeContext } from '@/context/ThemeProvider'
import Button from '@/components/buttons/Button'

const AppCard = () => {
    const {mode} = React.useContext(ThemeContext)
    return (
        <div 
            className={clsx(
            'w-3/6',
            'rounded-md  my-4 p-3 ',
            ' ring-white drop-shadow ',
            'transition-all duration-25',
            'border',
            mode === 'light' ? 'border-dark/5 ring-gray-600/50' : 'border-gray-400/70 ring ring-gray-400/50 ',
            mode === 'light' ? 'bg-gray-500/25' : 'bg-gray-700/70 ring ring-gray-700/50'
        )}>
            <div 
            className={clsx(
                'rounded p-1  ',
                ' ring-white drop-shadow ',
                // 'transition-all',
                'border',
                mode === 'light' ? 'border-dark/5 ring-gray-600/50' : 'border-gray-400/70 ring ring-gray-400/50 ',
                mode === 'light' ? 'bg-gray-100/75' : 'bg-gray-800/90 ring ring-gray-700/50',
                'flex gap-2'
            )}>
                <div>
                    <Button>Start</Button>
                </div>

                <div>
                    <h4>List</h4>
                    <ul>
                        <li>Bank 1</li>
                        <li>Bank 2</li>
                        <li>Bank 3</li>
                    </ul>
                </div>

                <div>
                    
                    <h4>Total</h4>
                    <h5>Avg income</h5>
                    <h5>Avg expense</h5>
                </div>

            </div>
        </div>
    )
}

export default AppCard