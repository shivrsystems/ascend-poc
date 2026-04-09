# Figma Design Cache — Forgot Password

# nodeId: 163:3233 | fileKey: n7hLF0V4FAqLsqkKxToOe3

# Cached: 2026-04-09

## Screenshot

Centered white card with rounded corners (16px radius), border #e9f1fa, padding 40px, 24px gap between elements:

- ATI logo icon (64×88px) at top center — render larger than Figma original for better visual presence
- Title: "Forgot Password?" — bold, 24px, color #1d2939, centered
- Subtitle: "No worries! Enter your email and we'll send you a link to reset your password." — regular, 14px, color #667085, centered, line-height 1.6
- Form section (20px gap between children):
  - Label: "Email Address" — semibold, 14px, color #1d2939
  - Input: white bg, border #d0d5dd, rounded 10px, padding 14px horiz / 12px vert, placeholder "Enter your email" in #98a2b3, 14px regular
  - Button: bg #d2453d, full width, rounded 10px, padding 14px vert, text "Send Reset Link" — white, 16px semibold, centered
- Link: "← Back to Sign In" — medium weight, 14px, color #1f72d0, centered

## Design Token Mapping

| Figma Value  | Design Token       |
| ------------ | ------------------ |
| #1d2939      | $color-gray-900    |
| #667085      | $color-gray-500    |
| #98a2b3      | $color-gray-400    |
| #d0d5dd      | $color-gray-300    |
| #e9f1fa      | $color-primary-50  |
| #d2453d      | $color-primary-600 |
| #1f72d0      | $color-info-600    |
| 40px padding | $spacing-3xl       |
| 24px gap     | $spacing-xl        |
| 20px gap     | $spacing-lg        |
| 6px gap      | $spacing-xs        |
| 16px radius  | $radius-xl         |
| 10px radius  | $radius-lg         |
| 14px horiz   | $spacing-md        |
| 12px vert    | $spacing-sm        |

## Reference Code (React+Tailwind — must convert to Angular)

```tsx
const imgFrame = 'https://www.figma.com/api/mcp/asset/e187def5-469a-4087-be65-554e27f95a47';

export default function ForgotPassword() {
  return (
    <div
      className="bg-white border border-[#e9f1fa] border-solid content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[40px] relative rounded-[16px] size-full"
      data-name="Forgot Password"
      data-node-id="163:3233"
    >
      <div
        className="h-[88px] relative shrink-0 w-[64px]"
        data-name="Frame"
        data-node-id="163:3234"
      >
        <img alt="" className="absolute block max-w-none size-full" src={imgFrame} />
      </div>
      <p
        className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#1d2939] text-[24px] text-center whitespace-nowrap"
        data-node-id="163:3236"
      >
        Forgot Password?
      </p>
      <div
        className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#667085] text-[14px] text-center whitespace-nowrap"
        data-node-id="163:3237"
      >
        <p className="leading-[1.6] mb-0">No worries! Enter your email and we'll send</p>
        <p className="leading-[1.6]">you a link to reset your password.</p>
      </div>
      <div
        className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Frame"
        data-node-id="163:3238"
      >
        <div
          className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full"
          data-name="Frame"
          data-node-id="163:3239"
        >
          <p
            className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1d2939] text-[14px] whitespace-nowrap"
            data-node-id="163:3240"
          >
            Email Address
          </p>
          <div
            className="bg-white border border-[#d0d5dd] border-solid content-stretch flex items-center overflow-clip px-[14px] py-[12px] relative rounded-[10px] shrink-0 w-full"
            data-name="Frame"
            data-node-id="163:3241"
          >
            <p
              className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#98a2b3] text-[14px] whitespace-nowrap"
              data-node-id="163:3242"
            >
              Enter your email
            </p>
          </div>
        </div>
        <div
          className="bg-[#d2453d] content-stretch flex items-center justify-center overflow-clip py-[14px] relative rounded-[10px] shrink-0 w-full"
          data-name="Frame"
          data-node-id="163:3243"
        >
          <p
            className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap"
            data-node-id="163:3244"
          >
            Send Reset Link
          </p>
        </div>
      </div>
      <p
        className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f72d0] text-[14px] text-center whitespace-nowrap"
        data-node-id="163:3245"
      >
        ← Back to Sign In
      </p>
    </div>
  );
}
```
