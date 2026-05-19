import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Megaphone, PackageSearch, Plus, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    image?: string;
}

interface PageProps {
    flash: {
        message?: string;
    },
    products: Product[];
}

export default function Index() {

    const { products, flash } =
        usePage<PageProps>().props;

    const {
        delete: destroy,
        processing
    } = useForm();

    const handleDelete = (
        id: number,
        name: string
    ) => {

        if (
            confirm(
                `Are you sure you want to delete "${name}" ?`
            )
        ) {
            destroy(route('products.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="p-6 space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight"> Product Catalog </h1>
                        <p className="text-muted-foreground mt-1"> Manage your products efficiently.</p>
                    </div>

                    <Button asChild className="h-11 rounded-xl px-5">
                        <Link href={route('products.create')}>
                            <Plus className="w-4 h-4 mr-2" /> Create Product </Link>
                    </Button>
                </div>

                {/* Flash Message */}
                {flash.message && (
                    <Alert className="border-green-500">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle> Success </AlertTitle>
                        <AlertDescription> {flash.message} </AlertDescription>
                    </Alert>
                )}

                {/* Products Table */}
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle> Products List </CardTitle>
                        <CardDescription> A list of all available products. </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {products.length > 0 ? (
                            <div className="rounded-xl border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-100 dark:bg-slate-800">
                                        <TableRow>
                                            <TableHead className="w-[80px]"> ID </TableHead>
                                            <TableHead> Product Name </TableHead>
                                            <TableHead> Price </TableHead>
                                            <TableHead> Description </TableHead>
                                            <TableHead> Quantity </TableHead>
                                            <TableHead> Image </TableHead> 
                                            <TableHead className="text-right"> Actions </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium"> {product.id} </TableCell>
                                                <TableCell> {product.name} </TableCell>
                                                <TableCell> {product.price.toFixed(2)} </TableCell>
                                                <TableCell className="max-w-[300px] truncate"> {product.description} </TableCell>
                                                <TableCell> {product.quantity} </TableCell>
                                                <TableCell> {product.image ? (
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-lg border"/>

                                                    ) : (

                                                        <div className="w-16 h-16 flex items-center justify-center rounded-lg border text-xs text-muted-foreground">
                                                            No Image
                                                        </div>
                                                    )}
                                                </TableCell>

                                                <TableCell className="text-right space-x-2">
                                                    <Button asChild size="sm" className="rounded-lg">
                                                        <Link href={route('products.edit', product.id)}>
                                                            <Pencil className="w-4 h-4 mr-1" /> Edit
                                                        </Link>
                                                    </Button>

                                                    <Button size="sm" variant="destructive" disabled={processing}
                                                        className="rounded-lg"
                                                        onClick={() => handleDelete(
                                                                product.id,
                                                                product.name
                                                            )}>
                                                        <Trash2 className="w-4 h-4 mr-1" /> Delete </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                        ) : (

                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <PackageSearch className="w-14 h-14 text-muted-foreground mb-4" />
                                <h2 className="text-xl font-semibold"> No Products Found </h2>
                                <p className="text-muted-foreground mt-2"> Start by creating your first product. </p>
                                <Button asChild className="mt-6 rounded-xl">
                                    <Link href={route('products.create')}>
                                        <Plus className="w-4 h-4 mr-2" />Create Product
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}