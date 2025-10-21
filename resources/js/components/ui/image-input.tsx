import * as React from 'react';

import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';
import  { type ChangeEventHandler, useState } from 'react';

type Props = {
    onFileChange?: (file: File) => void;
} & React.ComponentProps<"input">

function ImageInput({ className, defaultValue, ...props }: Props) {
    const [preview, setPreview] = useState(defaultValue as string)
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files.length > 0) {
            const file = target.files[0]
            setPreview(URL.createObjectURL(file))
            props.onFileChange?.(file)
        }
    }

    return (
        <div className={cn('group bg-muted relative rounded-md flex items-center justify-center cursor-pointer', props['aria-invalid'] && 'ring-destructive/20 dark:ring-destructive/40', 'border-destructive', className)}>
            <input
                onChange={handleChange}
                type="file"
                className={cn(
                    'absolute inset-0 opacity-0 cursor-pointer z-10'
                )}
                {...props}
            />
            {preview && <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:opacity-20 transition-opacity"/> }
            <UploadIcon size={16} className={
                cn(preview && "hidden group-hover:block relative z-5")
            }/>
        </div>
    )
}

export { ImageInput }
