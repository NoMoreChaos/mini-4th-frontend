import { Suspense } from 'react';
import DetailPageClient from './detailPageClient';

export default function DetailPage() {
    return (
        <Suspense fallback={<div className="max-w-5xl mx-auto px-6 py-10">
            불러오는 중...
        </div>}>
            <DetailPageClient />
        </Suspense>
    );
}