import Link from 'next/link';

export const ButtonLink = ({ label, desination }) => {
    return (
        <Link href={desination}>
            <a className="btn">
                {label}
            </a>
        </Link>
    )
}