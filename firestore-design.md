# firestore 設計

- [scenes](#scenes)

## scenes

### 概要

```
/scenes/{sceneId}
```

- スクショ
- ID: 自動生成ID

### 詳細


- createdAt: Timestamp 作成日時
- likes: Number いいね数
- screenshotUrl: String カードの画像リンク
- tags: String[] タグ
- title: String タイトル
- updatedAt: Timestamp 作成日時
