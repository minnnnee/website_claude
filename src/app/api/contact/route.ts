import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, phone, date, memo } = await req.json();

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
  }

  const embed = {
    title: '📋 새 상담 예약이 접수되었습니다!',
    color: 0xc4a882,
    fields: [
      { name: '👤 이름', value: name || '미입력', inline: true },
      { name: '📞 연락처', value: phone || '미입력', inline: true },
      { name: '📅 시공 희망일', value: date || '미정', inline: true },
      { name: '📝 문의 내용', value: memo || '내용 없음', inline: false },
    ],
    footer: { text: '감성도배 웹사이트 문의' },
    timestamp: new Date().toISOString(),
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
