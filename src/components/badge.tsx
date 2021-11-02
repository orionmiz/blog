import Link from 'next/link'

export default function Badge({ children, color } : { children: React.ReactNode, color: string }) {
  return (
  <>
    <Link href={`/tags/${children?.toString()}`}>
      <a>{children}</a>
    </Link>
    <style jsx>{`
      a {
        margin: 0 5px 0 0;
        font-size: 70%;
        line-height: 1.45;
        padding: 2px 5px;
        color: ${color};
        border-radius: 5px;
        background-color: gray;
      }
    `}</style>
  </>);
}