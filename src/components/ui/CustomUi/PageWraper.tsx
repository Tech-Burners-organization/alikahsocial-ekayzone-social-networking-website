import { cn } from '@/lib/utils';
import BackToPreviousPage from '@/utils/BackToPreviousPage';


interface PageWraperProps {
    className?: string;
    title: string;
    children: React.ReactNode;
    backToPreviousPage?: boolean;
}

const PageWraper: React.FC<PageWraperProps> = ({ className, title, children, backToPreviousPage }) => {
    return (
        <section className={cn("space-y-5 min-h-screen p-10", className)}>
            <div className="flex items-center gap-4">
                {backToPreviousPage && (
                    <BackToPreviousPage />

                )}
                <h1 className='text-2xl lg:text-3xl font-bold text-foreground'>{title}</h1>
            </div>
            {children}
        </section>
    );
};

export default PageWraper;