"use server";

import { get_all_cakes } from "@/services/cake/actions";
import CakeSlot from "../cake-page/cakeComponent";
import { get_rating } from "@/services/review/actions";

type LeaderboardEntry = {
    cakeId: number;
    name: string;
    bakerName: string;
    avgRating: number;
    reviewsCount: number;
};

export default async function LeaderboardPage() {
    const cakes = await get_all_cakes();
    if (!cakes || cakes.length === 0) {
        return (
            <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif'}}>
                <h1>🍰 Leaderboard </h1>
                <p>Det er ingen kaker her. Å nei!</p>

            </main>
        );
    }

    const entries: LeaderboardEntry[] = [];
    for (const cake of cakes) {
        const rating = await get_rating(cake.id);
        const avg = rating?.avgRating ?? 0
        const count = rating?.countRating ?? 0;

        entries.push({
            cakeId: cake.id,
            name: cake.name,
            bakerName: cake.bakerName,
            avgRating: Number(Number(avg).toFixed(2)),
            reviewsCount: count,
        });
    }

    entries.sort((a, b) =>
        b.avgRating !== a.avgRating
            ? b.avgRating - a.avgRating
            : b.reviewsCount - a.reviewsCount
);

    return (
        <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif'}}>
          <h1>🍰 Leaderboard</h1>
          <p>Beste kaker basert på gjennomsnittlig rating og antall anmeldelser.</p>  
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '1rem',
                    }}
                    >
                    
                    <thead>
                        <tr>
                            <th style= {{ textAlign: 'left', borderBottom: '1px solid #ccc'}}>Plass</th>
                            <th style= {{ textAlign: 'left', borderBottom: '1px solid #ccc'}}>Kake</th>
                            <th style= {{ textAlign: 'left', borderBottom: '1px solid #ccc'}}>Baker</th>
                            <th style= {{ textAlign: 'right', borderBottom: '1px solid #ccc'}}>Snitt(0-6)</th>
                            <th style= {{ textAlign: 'right', borderBottom: '1px solid #ccc'}}>Antall</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((item, idx) => (
                            <tr key={item.cakeId}>
                                <td style = {{ padding: '8px 0' }}>{idx + 1}</td>
                                <td style = {{ padding: '8px 0' }}>{item.name}</td>
                                <td style = {{ padding: '8px 0' }}>{item.bakerName}</td>
                                <td style = {{ padding: '8px 0', textAlign: 'right' }}>{item.avgRating}</td>
                                <td style = {{ padding: '8px 0', textAlign: 'right' }}>{item.reviewsCount}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </main>
    );
}