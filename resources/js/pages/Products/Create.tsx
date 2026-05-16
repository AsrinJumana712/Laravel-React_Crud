import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useForm } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Displaying errors if any */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="gap-1.5">
                        <Label htmlFor="product name">Name</Label>
                        <Input id="product name" type="text" placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="product price">Price</Label>
                        <Input id="product price" type="text" placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="product description">Description</Label>
                        <Textarea id="product description" placeholder="Product Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>
                    <Button className="mt-4" type="submit">Add Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}