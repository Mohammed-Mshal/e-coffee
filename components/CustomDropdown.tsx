import React from 'react'

export default function CustomDropdown({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('dropdown')) {
            setIsOpen(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    const toggleDropdown = () => {
        if (isOpen === false) {
            document.addEventListener('click', handleClickOutside)
        } else {
            document.removeEventListener('click', handleClickOutside)
        }
        setIsOpen(!isOpen)
    }
    const enhancedChildren = React.Children.map(children, child => {
        // @ts-expect-error Check if the child is the DropdownItems component by its displayName
        if (child && child?.type && child.type.displayName === 'DropdownItems') {
            // @ts-expect-error Clone the child and pass the isOpen prop to it
            return React.cloneElement(child, { isOpen })
        }
        // @ts-expect-error Clone the child and pass the isOpen prop to it
        else if (child && child?.type && child.type.displayName === 'DropdownButton') {
            // @ts-expect-error Clone the child and pass the isOpen prop to it
            return React.cloneElement(child, { toggleDropdown })
        }
        return child
    })
    return (
        <div className='dropdown relative'>
            {enhancedChildren}
        </div>
    )
}

function Button({ children, toggleDropdown }: { children: React.ReactNode, toggleDropdown?: () => void }) {
    return (
        <button
            onClick={toggleDropdown}
            title='Toggle Dropdown'
            type='button'
            className={`cursor-pointer`}>
            {children}
        </button>
    )
}
function Items({ children, isOpen }: { children: React.ReactNode, isOpen?: boolean }) {
    return (
        <div className={`cursor-pointer flex flex-col ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-all duration-300 absolute top-full left-0 bg-white shadow-md overflow-hidden rounded-md w-fit text-nowrap`}>
            {children}
        </div>
    )
}

Items.displayName = 'DropdownItems'
Button.displayName = 'DropdownButton'
CustomDropdown.Items = Items
CustomDropdown.Button = Button