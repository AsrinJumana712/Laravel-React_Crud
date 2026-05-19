import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useForm } from "@inertiajs/react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleAlert, PencilLine } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image?: string;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {

    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        quantity: product.quantity.toString(),
        image: null as File | null,
        _method: 'put',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('products.update', product.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Update Product',
                    href: `/products/${product.id}/edit`
                }
            ]}
        >
            <Head title="Update Product" />
            <div className="flex justify-center px-4 py-8">
                <Card className="w-full max-w-2xl rounded-2xl shadow-xl border-0">
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <PencilLine className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl"> Update Product </CardTitle>
                        </div>

                        <CardDescription> Modify the product information and save the changes. </CardDescription>
                    </CardHeader>

                    <CardContent>

                        {/* Validation Errors */}
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive" className="mb-6">
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle> Validation Error </AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}> {message as string} </li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-6">

                            {/* Current Product Image */}
                            {product.image && (
                                <div className="space-y-2">
                                    <Label> Current Product Image </Label>
                                    <img src={`/storage/${product.image}`} alt={product.name}
                                        className="w-40 h-40 object-cover rounded-xl border"/>
                                </div>
                            )}

                            {/* Product Name */}
                            <div className="space-y-2">
                                <Label htmlFor="product-name"> Product Name </Label>
                                <Input id="product-name" type="text" placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-11" />
                            </div>

                            {/* Product Price */}
                            <div className="space-y-2">
                                <Label htmlFor="product-price"> Product Price</Label>
                                <Input id="product-price" type="number" placeholder="Enter product price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="h-11" />
                            </div>

                            {/* Product Description */}
                            <div className="space-y-2">
                                <Label htmlFor="product-description"> Product Description </Label>
                                <Textarea id="product-description" placeholder="Write product description..."
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="min-h-[120px]" />
                            </div>

                            {/* Product Quantity */}
                            <div className="space-y-2">
                                <Label htmlFor="product-quantity"> Product Quantity </Label>
                                <Input id="product-quantity" type="number" placeholder="Enter product quantity"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="h-11" />
                            </div>

                            {/* Replace Product Image */}
                            <div className="space-y-2">
                                <Label htmlFor="product-image"> Replace Product Image </Label>

                                {/* Current File Name */}
                                {product.image && (
                                    <p className="text-sm text-muted-foreground">
                                        Current Image:
                                        <span className="font-medium ml-1">
                                            {product.image.split('/').pop()}
                                        </span>
                                    </p>
                                )}

                                <Input id="product-image" type="file" accept="image/*"
                                    onChange={(e) => setData( 'image', e.target.files?.[0] || null)}/>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="h-11 px-6 rounded-xl">
                                    {processing
                                        ? 'Updating Product...'
                                        : 'Update Product'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}