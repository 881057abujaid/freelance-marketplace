import { useEffect, useState } from "react";
import api from "../../services/api";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";

import { getMe, updateProfile } from "../../services/userService";

const Profile = () => {
    const [user, setUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        bio: "",
        avatar: null,
    });

    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // fetch user
    useEffect(() => {
        getMe().then(res => {
            setUser(res.data);

            setForm({
                name: res.data.name || "",
                bio: res.data.bio || "",
                avatar: null,
            });

            const base = api.defaults.baseURL.replace("/api", "");
            setPreview(res.data.avatar ? base + res.data.avatar : null);
        });
    }, []);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        handleChange("avatar", file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("bio", form.bio);

        if (form.avatar) {
            formData.append("avatar", form.avatar);
        }

        await updateProfile(formData);

        setSaving(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <Container>

            <Card className="max-w-md mx-auto p-6">

                <h1 className="text-xl font-bold mb-6">My Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col items-center gap-3">
                        <Avatar src={preview || "/avatar.png"} size={120} />
                        <input type="file" accept="image/*" onChange={handleImage} />
                    </div>

                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <Textarea
                        rows={4}
                        placeholder="Bio"
                        value={form.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                    />

                    <Button disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </Button>

                    {saved && (
                        <p className="text-green-600 text-sm text-center">
                            Profile updated ✓
                        </p>
                    )}

                </form>

            </Card>

        </Container>
    );
};

export default Profile;