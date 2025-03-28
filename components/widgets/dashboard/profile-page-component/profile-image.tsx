import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface ImageUploadProps {
  initialImage: string;
  imageSize?: number;
  className?: string;
  pencilFormat?: string;
}

export function ProfileImage({
  initialImage,
  imageSize = 150,
  className = '',
  pencilFormat = 'flex',
}: ImageUploadProps) {
  const [image, setImage] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-row items-end gap-0">
      <div className="relative h-[150px] w-[150px] justify-center overflow-hidden rounded-full border-2 border-foreground">
        <Image
          src={image}
          alt="business logo"
          className="object-cover"
          width={imageSize}
          height={imageSize}
        />
      </div>
      <Button className="flex rounded-lg -ml-3" onClick={handleButtonClick}>
        <Pencil className={pencilFormat} />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}