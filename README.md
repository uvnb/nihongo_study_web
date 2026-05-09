# Nihongo Study Web

Nihongo Study Web là một web học tiếng Nhật tập trung vào giai đoạn N5, được xây theo hướng học có lộ trình, ôn tập lặp lại và theo dõi tiến độ học tập. Sản phẩm hiện đã có frontend đa ngôn ngữ `vi/en/ja`, backend API riêng, xác thực bằng email/mật khẩu và Google OAuth, cùng dashboard theo dõi việc học.

## Điểm chính của MVP

- Học theo bài với `lesson` list/detail và nội dung lý thuyết cơ bản.
- Quản lý `vocabulary` và `kanji` với CRUD, tìm kiếm và lọc.
- Flashcard có `SRS` cơ bản để ôn tập lặp lại.
- Mixed quiz gồm trắc nghiệm và nhập reading, có lưu lịch sử làm bài.
- Dashboard hiển thị streak, lesson completion, quiz history và review đến hạn.
- Kanji có `stroke order animation` cho bộ dữ liệu seed hiện tại.
- Giao diện lấy cảm hứng từ thẩm mỹ Nhật Bản, hỗ trợ tiếng Việt có dấu đầy đủ.

## Kiến trúc

- `frontend/`: Next.js 14, Tailwind CSS
- `backend/`: FastAPI, SQLAlchemy, Alembic
- `database/production`: PostgreSQL trên Railway
- `cache/infra`: Redis trên Railway
- `deploy`: Vercel cho frontend và API

## Trạng thái hiện tại

MVP phase 1 đã gần hoàn chỉnh và đang chạy trên production:

- Frontend: `https://nihongo-frontend-beige.vercel.app`
- API: `https://nihongo-api.vercel.app`

## Dữ liệu học tập

Hệ thống hiện có seed N5 ban đầu với:

- 5 lessons
- 30 vocabulary entries
- 15 kanji entries

Hướng phát triển dữ liệu tiếp theo là dùng dataset mở như `JMdict`, `KANJIDIC2`, `KanjiVG`, `Tatoeba`, sau đó ingest vào database nội bộ thay vì phụ thuộc runtime vào API từ điển bên ngoài.

## Mục tiêu sản phẩm

Web này được xây để trở thành một nền tảng học tiếng Nhật gọn, rõ, dễ dùng:

- đủ nhẹ để tự học mỗi ngày
- đủ cấu trúc để học theo giáo trình
- đủ công cụ để ôn lại bằng flashcard, quiz và dashboard tiến độ
