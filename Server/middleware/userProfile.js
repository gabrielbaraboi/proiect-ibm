export const userProfile = async (req, res, next) => {
    if (req.params.id !== req.user.id && req.user.role !== 'admin')
        return res.status(403).json({ message: "This is not your profile!" });
    next();
};