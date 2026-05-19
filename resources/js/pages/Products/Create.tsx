import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleAlert, PackagePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

export default function Create() {

    const { data, setData, post, processing, errors} = useForm({
        name: "",
        price: "",
        description: "",
        quantity: "",
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex justify-center px-4 py-8">
                <Card className="w-full max-w-2xl shadow-xl border-0 rounded-2xl">
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <PackagePlus className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl"> Create New Product </CardTitle>
                        </div>

                        <CardDescription> Add a new product to your catalog with image, name, price, quantity, and description. </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Error Alert */}
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive" className="mb-6" >
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>  Validation Error </AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}> {message as string} </li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6" >

                            {/* Product Name */}
                            <div className="space-y-2">
                                <Label htmlFor="product-name"> Product Name </Label>
                                <Input id="product-name" type="text" placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-11"/>
                            </div>

                            {/* Product Price */}
                            <div className="space-y-2">
                                <Label htmlFor="product-price"> Product Price </Label>
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
                                    className="min-h-[120px]"/>
                            </div>

                            {/* Product Quantity */}
                            <div className="space-y-2">
                                <Label htmlFor="product-quantity"> Product Quantity </Label>
                                <Input id="product-quantity" type="number" placeholder="Enter product quantity"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="h-11"/>
                            </div>

                            {/* Product Image Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="product-image"> Product Image </Label>
                                <Input id="product-image" type="file" accept="image/*"
                                    onChange={(e) =>
                                        setData('image', e.target.files?.[0] || null)} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="px-6 h-11 rounded-xl">
                                    {processing
                                        ? 'Adding Product...'
                                        : 'Add Product'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}