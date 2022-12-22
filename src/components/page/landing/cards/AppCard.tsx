import React from 'react'
import clsx from 'clsx'
import { ThemeContext } from '@/context/ThemeProvider'
import Button from '@/components/buttons/Button'
import { FaCartPlus } from 'react-icons/fa'
import { BsFillCheckSquareFill, BsFillPlusCircleFill, BsFillPlusSquareFill } from 'react-icons/bs'
import Image from 'next/image'

const AppCard = () => {
    const {mode} = React.useContext(ThemeContext)
    return (
        <div 
            className={clsx(
            'w-3/6',
            'rounded-md  my-4 p-2 ',
            ' ring-white drop-shadow ',
            'transition-all duration-25',
            'border',
            mode === 'light' ? 'border-dark/5 ring-gray-600/50' : 'border-gray-400/70 ring ring-gray-400/50 ',
            mode === 'light' ? 'bg-gray-500/25' : 'bg-gray-700/70 ring ring-gray-700/50'
        )}>
            <div 
                className={clsx(
                    'rounded p-2  ',
                    ' ring-white drop-shadow ',
                    'border',
                    mode === 'light' ? 'border-dark/5 ring-gray-600/50' : 'border-gray-400/70 ring ring-gray-400/50 ',
                    mode === 'light' ? 'bg-gray-100/75' : 'bg-gray-800/90 ring ring-gray-700/50',
                    'flex gap-2'
            )}>
                
                <div className='flex flex-col h-full gap-2 pt-2'>
                    <Button className='py-0 px-4' variant='theme-dependent'>Start</Button>
                    <Image src='/images/plaid.png' width='72' height='72' className='bg-white rounded-md'/>
                </div>

                <div>
                    <strong>Banks:</strong>
                    <ul className=''>
                        {banks.map((bank, i)=>
                            <li key={bank.name} className={clsx(
                                'w-52',
                                'hover:cursor-pointer',
                                'hover:bg-sky-500/20',
                                'rounded border bg-transparent px-3 py-0 my-[3px] ring-2 ring-transparent drop-shadow',
                                mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
                                i === 2 && 'bg-sky-500 text-white ring-sky-600'
                            )}>
                                <div className='inline-flex justify-between w-full'>
                                    <h6>{bank.name}</h6>
                                    <button className='rounded bg-transparent'>
                                        {i === 2 ? <BsFillCheckSquareFill className='text-xl'/>  : <BsFillPlusSquareFill className='text-xl'/> }
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    
                    <strong>Stats:</strong> <br/>
                    <div className=' inline-flex'> 
                        <h5>Total</h5>
                        <h5>{banks.map(bank => bank.total).reduce((a,b)=> a+b)}</h5>
                    </div>
                    <h5>Avg income</h5>
                    <h5>Avg expense</h5>
                </div>

            </div>
        </div>
    )
}

export default AppCard


const banks = [
    {
        name:'Bank of America',
        total:2000,
        income:1344
    },
    {
        name:'Capital One',
        total:2000,
        income:1660
    },
    {
        name:'American Express',
        total:2000,
        income:2700
    },
]