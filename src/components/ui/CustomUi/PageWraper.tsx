import { cn } from '@/lib/utils';
import BackToPreviousPage from '@/utils/BackToPreviousPage';
import Container from './Container';


interface PageWraperProps {
    className?: string;
    title: string;
    children: React.ReactNode;
    backToPreviousPage?: boolean;
    /** Rendered at the far right of the title row — e.g. an overflow menu for the page. */
    headerAction?: React.ReactNode;
}

const PageWraper: React.FC<PageWraperProps> = ({ className, title, children, backToPreviousPage, headerAction }) => {
    return (
        <Container className='py-10'>
            <section className={cn("space-y-5 min-h-screen", className)}>
                <div className="flex items-center gap-4">
                    {backToPreviousPage && (
                        <BackToPreviousPage />

                    )}
                    <h1 className='text-2xl lg:text-3xl font-bold text-foreground'>{title}</h1>
                    {headerAction && <div className="ml-auto">{headerAction}</div>}
                </div>
                {children}
            </section>
        </Container>
    );
};

export default PageWraper;
