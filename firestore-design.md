# firestore 設計

- [scenes](#scenes)
- [tags](#tags)

## scenes

### 概要

```
/scenes/{sceneId}
```

- スクショ
- ID: 自動生成ID

### 詳細


- createdAt: Timestamp 作成日時
- likes: number いいね数
- screenshotUrl: string カードの画像リンク
- tags: string[] タグ
- title: string タイトル
- updatedAt: Timestamp 作成日時

## tags

### 概要

```
/tags/{tagId}
```

- タグ
- ID: 自動生成ID

### 詳細


- createdAt: Timestamp 作成日時
- label: string タグ名
- scenesCount: number タグがつけられている画像の数
- updatedAt: Timestamp 作成日時
