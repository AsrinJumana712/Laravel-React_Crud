import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <div className="w-8/12 p-4">
                <form>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Product Name"/>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}