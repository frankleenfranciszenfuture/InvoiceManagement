export default function FormLabel({
    children,
    required = false,
}) {
    return (
        <label className="pt-2 text-sm font-medium text-gray-400">

            {children}

            {required && (
                <span className="ml-1 text-red-500">*</span>
            )}

        </label>
    );
}