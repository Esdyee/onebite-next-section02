const https = require('https');
const http = require('http');

async function testOpenGraph(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, (res) => {
            let html = '';

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                // 정규식으로 메타 태그 추출
                const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
                const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
                const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i);
                const ogDescMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/i);
                const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i);

                const result = {
                    title: titleMatch ? titleMatch[1] : null,
                    description: descMatch ? descMatch[1] : null,
                    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
                    ogDescription: ogDescMatch ? ogDescMatch[1] : null,
                    ogImage: ogImageMatch ? ogImageMatch[1] : null
                };

                resolve(result);
            });
        }).on('error', reject);
    });
}

// 로컬 서버 테스트
async function main() {
    console.log('🔍 오픈그래프 태그 테스트\n');

    try {
        const result = await testOpenGraph('http://localhost:4000');

        console.log('📄 페이지 정보:');
        console.log(`Title: ${result.title}`);
        console.log(`Description: ${result.description}`);
        console.log('');

        console.log('📱 오픈그래프 정보:');
        console.log(`OG Title: ${result.ogTitle}`);
        console.log(`OG Description: ${result.ogDescription}`);
        console.log(`OG Image: ${result.ogImage}`);
        console.log('');

        // 검증
        const issues = [];
        if (!result.ogTitle) issues.push('⚠️  og:title이 설정되지 않음');
        if (!result.ogDescription) issues.push('⚠️  og:description이 설정되지 않음');
        if (!result.ogImage) issues.push('⚠️  og:image가 설정되지 않음');

        if (issues.length > 0) {
            console.log('❌ 발견된 문제점:');
            issues.forEach(issue => console.log(issue));
        } else {
            console.log('✅ 모든 오픈그래프 태그가 올바르게 설정됨');
        }

    } catch (error) {
        console.error('❌ 테스트 실패:', error.message);
        console.log('💡 로컬 서버가 실행 중인지 확인하세요 (http://localhost:4000)');
    }
}

main();